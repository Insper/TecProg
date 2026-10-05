(function () {
  "use strict";

  const DIRECTIONS = [
    { dr: -1, dc: 0, label: "cima", codeLine: 5 },
    { dr: 1, dc: 0, label: "baixo", codeLine: 6 },
    { dr: 0, dc: -1, label: "esquerda", codeLine: 7 },
    { dr: 0, dc: 1, label: "direita", codeLine: 8 },
  ];

  const CODE_LABELS = {
    1: "Se estiver fora da matriz, retorna FALSE",
    2: "Se for parede ou já visitada, retorna FALSE",
    3: "Se for o destino, retorna TRUE",
    4: "Marca a posição como visitada",
    5: "Tenta o vizinho de cima",
    6: "Tenta o vizinho de baixo",
    7: "Tenta o vizinho da esquerda",
    8: "Tenta o vizinho da direita",
    9: "Retorna FALSE",
    10: "Retorna TRUE",
  };

  function cellKey(row, column) {
    return `${row},${column}`;
  }

  function positionText(row, column) {
    return `(${row}, ${column})`;
  }

  function clonePosition(position) {
    return position ? { row: position.row, column: position.column } : null;
  }

  function parseMaze(rawValue) {
    const lines = String(rawValue)
      .replace(/\r/g, "")
      .split("\n")
      .map((line) => line.replace(/\s/g, ""))
      .filter((line) => line.length > 0);

    if (lines.length === 0) {
      throw new Error("Digite uma matriz não vazia.");
    }

    const columns = lines[0].length;
    if (columns === 0) {
      throw new Error("Cada linha deve conter pelo menos uma posição.");
    }

    const grid = [];
    let start = null;
    let destination = null;

    lines.forEach((line, row) => {
      if (line.length !== columns) {
        throw new Error("A matriz deve ser retangular: todas as linhas precisam ter o mesmo tamanho.");
      }

      const cells = Array.from(line);
      cells.forEach((cell, column) => {
        if (!["S", "D", "#", "."].includes(cell)) {
          throw new Error(`Símbolo inválido na posição ${positionText(row, column)}: use apenas S, D, # ou .`);
        }
        if (cell === "S") {
          if (start) {
            throw new Error("A matriz deve conter exatamente uma origem S.");
          }
          start = { row, column };
        }
        if (cell === "D") {
          if (destination) {
            throw new Error("A matriz deve conter exatamente um destino D.");
          }
          destination = { row, column };
        }
      });
      grid.push(cells);
    });

    if (!start) {
      throw new Error("A matriz precisa conter uma origem S.");
    }
    if (!destination) {
      throw new Error("A matriz precisa conter um destino D.");
    }

    return {
      grid,
      rows: grid.length,
      columns,
      start,
      destination,
    };
  }

  function generateTrace(maze) {
    const frames = [];
    const visited = new Set();
    const events = [];
    let finalResult = null;

    function frameSnapshot(frame) {
      return {
        row: frame.row,
        column: frame.column,
        phase: frame.phase,
        nextDirection: frame.nextDirection,
        returnValue: frame.returnValue,
      };
    }

    function record(kind, message, codeLine, details) {
      const top = frames[frames.length - 1];
      const eventDetails = details || {};
      events.push({
        kind,
        message,
        codeLine: codeLine || null,
        current: top ? { row: top.row, column: top.column } : null,
        candidate: clonePosition(eventDetails.candidate),
        stack: frames.map(frameSnapshot),
        markKey: eventDetails.markKey || null,
        solutionPathKeys: eventDetails.solutionPathKeys || null,
        result: typeof eventDetails.result === "boolean" ? eventDetails.result : null,
      });
    }

    function pushFrame(row, column) {
      frames.push({
        row,
        column,
        phase: "checking",
        nextDirection: 0,
        returnValue: null,
        returnLine: null,
        returnReason: "",
      });
      record("enter", `Chama existeCaminho${positionText(row, column)}.`, null);
    }

    pushFrame(maze.start.row, maze.start.column);

    while (frames.length > 0) {
      const frame = frames[frames.length - 1];

      if (frame.phase === "checking") {
        const inside =
          frame.row >= 0 &&
          frame.row < maze.rows &&
          frame.column >= 0 &&
          frame.column < maze.columns;

        if (!inside) {
          record(
            "check-bounds",
            `${positionText(frame.row, frame.column)} está fora da matriz; esta chamada retornará FALSE.`,
            1
          );
          frame.returnValue = false;
          frame.returnLine = 1;
          frame.returnReason = "a posição está fora da matriz";
          frame.phase = "returning";
          continue;
        }

        const key = cellKey(frame.row, frame.column);
        const cell = maze.grid[frame.row][frame.column];
        const isVisited = visited.has(key);

        if (cell === "#" || isVisited) {
          let reason = cell === "#" ? "é uma parede" : "já foi visitada";
          if (cell === "#" && isVisited) {
            reason = "é uma parede e já foi visitada";
          }
          record(
            "check-obstacle",
            `${positionText(frame.row, frame.column)} ${reason}; esta chamada retornará FALSE.`,
            2
          );
          frame.returnValue = false;
          frame.returnLine = 2;
          frame.returnReason = reason;
          frame.phase = "returning";
          continue;
        }

        record(
          "check-obstacle",
          `${positionText(frame.row, frame.column)} não é parede e ainda não foi visitada.`,
          2
        );

        const isDestination =
          frame.row === maze.destination.row && frame.column === maze.destination.column;
        if (isDestination) {
          const pathKeys = frames.map((activeFrame) =>
            cellKey(activeFrame.row, activeFrame.column)
          );
          record(
            "check-destination",
            `${positionText(frame.row, frame.column)} é D: encontrou o destino e retorna TRUE.`,
            3,
            { solutionPathKeys: pathKeys, result: true }
          );
          frame.returnValue = true;
          frame.returnLine = 10;
          frame.returnReason = "a posição é o destino";
          frame.phase = "returning";
          continue;
        }

        visited.add(key);
        frame.phase = "exploring";
        record(
          "mark",
          `${positionText(frame.row, frame.column)} foi marcada como visitada.`,
          4,
          { markKey: key }
        );
        continue;
      }

      if (frame.phase === "exploring") {
        if (frame.nextDirection < DIRECTIONS.length) {
          const direction = DIRECTIONS[frame.nextDirection];
          frame.nextDirection += 1;
          const nextRow = frame.row + direction.dr;
          const nextColumn = frame.column + direction.dc;
          frame.phase = "waiting";
          record(
            "call",
            `Tenta ${direction.label}: chama existeCaminho${positionText(nextRow, nextColumn)}.`,
            direction.codeLine,
            { candidate: { row: nextRow, column: nextColumn } }
          );
          pushFrame(nextRow, nextColumn);
          continue;
        }

        frame.returnValue = false;
        frame.returnLine = 9;
        frame.returnReason = "nenhum vizinho encontrou o destino";
        frame.phase = "returning";
        continue;
      }

      if (frame.phase === "returning") {
        const result = frame.returnValue === true;
        const returnText = result ? "TRUE" : "FALSE";
        record(
          "return",
          `existeCaminho${positionText(frame.row, frame.column)} retorna ${returnText}${
            frame.returnReason ? `: ${frame.returnReason}.` : "."
          }`,
          frame.returnLine || (result ? 10 : 9),
          { result }
        );

        frames.pop();
        if (frames.length === 0) {
          finalResult = result;
          record(
            "complete",
            result
              ? "Busca concluída: existe um caminho até D."
              : "Busca concluída: não existe um caminho até D.",
            result ? 10 : 9,
            { result }
          );
          break;
        }

        const parent = frames[frames.length - 1];
        if (result) {
          parent.returnValue = true;
          parent.returnLine = 10;
          parent.returnReason = "um vizinho retornou TRUE";
          parent.phase = "returning";
        } else {
          parent.phase = "exploring";
        }
      }
    }

    return { events, result: finalResult };
  }

  function initializeVisualizer(root) {
    const refs = {
      input: root.querySelector("#dfs-maze-input"),
      error: root.querySelector('[data-dfs-role="error"]'),
      execute: root.querySelector('[data-dfs-action="execute"]'),
      previous: root.querySelector('[data-dfs-action="previous"]'),
      next: root.querySelector('[data-dfs-action="next"]'),
      play: root.querySelector('[data-dfs-action="play"]'),
      reset: root.querySelector('[data-dfs-action="reset"]'),
      stepLabel: root.querySelector('[data-dfs-role="step-label"]'),
      status: root.querySelector('[data-dfs-role="status"]'),
      progress: root.querySelector('[role="progressbar"]'),
      progressBar: root.querySelector('[data-dfs-role="progress-bar"]'),
      grid: root.querySelector('[data-dfs-role="grid"]'),
      visitedCounter: root.querySelector('[data-dfs-role="visited-counter"]'),
      stack: root.querySelector('[data-dfs-role="stack"]'),
      stackCounter: root.querySelector('[data-dfs-role="stack-counter"]'),
      stackEmpty: root.querySelector('[data-dfs-role="stack-empty"]'),
      action: root.querySelector('[data-dfs-role="action"]'),
      codeLine: root.querySelector('[data-dfs-role="code-line"]'),
      result: root.querySelector('[data-dfs-role="result"]'),
      codeLines: root.querySelectorAll("[data-dfs-code-line]"),
    };

    const state = {
      maze: null,
      events: [],
      result: null,
      cursor: -1,
      dirty: false,
      error: null,
      playing: false,
      timer: null,
    };

    function stopPlayback() {
      state.playing = false;
      if (state.timer !== null) {
        window.clearTimeout(state.timer);
        state.timer = null;
      }
    }

    function viewAtCursor() {
      const visited = new Set();
      let solutionPath = new Set();
      for (let index = 0; index <= state.cursor; index += 1) {
        const event = state.events[index];
        if (event.markKey) {
          visited.add(event.markKey);
        }
        if (event.solutionPathKeys) {
          solutionPath = new Set(event.solutionPathKeys);
        }
      }

      return {
        event: state.cursor >= 0 ? state.events[state.cursor] : null,
        visited,
        solutionPath,
        stack: state.cursor >= 0 ? state.events[state.cursor].stack : [],
      };
    }

    function cellDescription(maze, row, column, view, key) {
      const cell = maze.grid[row][column];
      let description = cell === "#" ? "parede" : "posição livre";
      if (cell === "S") {
        description = "origem S";
      } else if (cell === "D") {
        description = "destino D";
      }
      if (view.visited.has(key)) {
        description += ", visitada";
      }
      if (view.solutionPath.has(key)) {
        description += ", no caminho encontrado";
      }
      return `linha ${row + 1}, coluna ${column + 1}: ${description}`;
    }

    function renderGrid(view) {
      refs.grid.replaceChildren();
      if (!state.maze) {
        refs.grid.style.removeProperty("--dfs-columns");
        return;
      }

      refs.grid.style.setProperty("--dfs-columns", state.maze.columns);
      const event = view.event;
      const currentKey = event && event.current
        ? cellKey(event.current.row, event.current.column)
        : null;
      const candidateKey = event && event.candidate
        ? cellKey(event.candidate.row, event.candidate.column)
        : null;
      const rejected = event && ["check-bounds", "check-obstacle"].includes(event.kind);

      state.maze.grid.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
          const key = cellKey(rowIndex, columnIndex);
          const cellElement = document.createElement("div");
          cellElement.className = "dfs-visualizer__cell";
          cellElement.setAttribute("role", "gridcell");
          cellElement.setAttribute(
            "aria-label",
            cellDescription(state.maze, rowIndex, columnIndex, view, key)
          );
          cellElement.textContent = cell;

          if (cell === "#") {
            cellElement.classList.add("is-wall");
          }
          if (view.visited.has(key)) {
            cellElement.classList.add("is-visited");
          }
          if (view.solutionPath.has(key)) {
            cellElement.classList.add("is-path");
          }
          if (key === candidateKey) {
            cellElement.classList.add("is-candidate");
          }
          if (key === currentKey) {
            cellElement.classList.add("is-current");
            if (rejected) {
              cellElement.classList.add("is-rejected");
            }
          }
          if (cell === "S") {
            cellElement.classList.add("is-start");
          }
          if (cell === "D") {
            cellElement.classList.add("is-destination");
          }

          refs.grid.appendChild(cellElement);
        });
      });
    }

    function phaseLabel(frame) {
      if (frame.returnValue === true) {
        return "retornará TRUE";
      }
      if (frame.returnValue === false) {
        return "retornará FALSE";
      }
      if (frame.phase === "waiting") {
        return "aguardando retorno";
      }
      if (frame.phase === "exploring") {
        return "explorando vizinhos";
      }
      return "verificando posição";
    }

    function renderStack(view) {
      refs.stack.replaceChildren();
      const stack = view.stack.slice().reverse();
      refs.stackCounter.textContent = `${stack.length} ${stack.length === 1 ? "chamada" : "chamadas"}`;
      refs.stackEmpty.hidden = stack.length > 0;

      stack.forEach((frame, index) => {
        const item = document.createElement("div");
        item.className = "dfs-visualizer__frame";
        if (index === 0) {
          item.classList.add("is-top");
        }
        if (frame.returnValue === true) {
          item.classList.add("is-success");
        } else if (frame.returnValue === false) {
          item.classList.add("is-failure");
        }
        item.setAttribute("role", "listitem");

        const title = document.createElement("strong");
        title.textContent = `existeCaminho${positionText(frame.row, frame.column)}`;
        const phase = document.createElement("span");
        phase.textContent = phaseLabel(frame);
        item.append(title, phase);

        if (index === 0) {
          const top = document.createElement("span");
          top.className = "dfs-visualizer__frame-top";
          top.textContent = "TOPO";
          item.appendChild(top);
        }
        refs.stack.appendChild(item);
      });
    }

    function renderCode(event) {
      refs.codeLines.forEach((line) => line.classList.remove("is-active"));
      if (event && event.codeLine) {
        const activeLine = root.querySelector(`[data-dfs-code-line="${event.codeLine}"]`);
        if (activeLine) {
          activeLine.classList.add("is-active");
        }
      }
    }

    function render() {
      const view = viewAtCursor();
      const event = view.event;
      const total = state.events.length;
      const completedSteps = Math.max(0, state.cursor + 1);
      const visitedCount = view.visited.size;

      renderGrid(view);
      renderStack(view);
      renderCode(event);
      refs.visitedCounter.textContent = `${visitedCount} ${visitedCount === 1 ? "visitada" : "visitadas"}`;
      refs.stepLabel.textContent = total === 0
        ? "Nenhum passo disponível"
        : state.cursor < 0
          ? `Antes do primeiro passo · ${total} eventos`
          : `Passo ${state.cursor + 1} de ${total}`;
      refs.progress.max = total;
      refs.progress.value = completedSteps;
      refs.progress.setAttribute("aria-valuemax", String(total));
      refs.progress.setAttribute("aria-valuenow", String(completedSteps));
      refs.progressBar.style.width = total > 0 ? `${(completedSteps / total) * 100}%` : "0%";

      if (state.error) {
        refs.status.textContent = "Corrija a matriz para executar a busca.";
        refs.action.textContent = "A execução não foi iniciada.";
        refs.codeLine.textContent = "Nenhuma linha executada.";
        refs.result.textContent = "Não há resultado enquanto a matriz for inválida.";
      } else if (state.dirty) {
        refs.status.textContent = "Matriz alterada; clique em Executar para atualizar a simulação.";
        refs.action.textContent = "A simulação exibida ainda corresponde à matriz anterior.";
        refs.codeLine.textContent = "Clique em Executar para gerar uma nova linha do tempo.";
        refs.result.textContent = "A matriz editada ainda não foi executada.";
      } else if (!event) {
        refs.status.textContent = "Pronto para executar passo a passo.";
        refs.action.textContent = "Clique em “Próximo passo” para iniciar.";
        refs.codeLine.textContent = "Nenhuma linha executada.";
        refs.result.textContent = "Ainda não há resultado.";
      } else {
        refs.status.textContent = event.message;
        refs.action.textContent = event.message;
        refs.codeLine.textContent = event.codeLine
          ? `Linha ${event.codeLine}: ${CODE_LABELS[event.codeLine]}`
          : event.kind === "complete"
            ? "Execução concluída."
            : "Chamada da função recursiva.";
        if (event.kind === "complete") {
          refs.result.textContent = event.result
            ? "Resultado: caminho encontrado até D."
            : "Resultado: não existe caminho até D.";
        } else if (event.kind === "check-destination" && event.result === true) {
          refs.result.textContent = "Destino encontrado; o retorno TRUE está subindo pela pilha.";
        } else {
          refs.result.textContent = "Busca em andamento.";
        }
      }

      refs.error.hidden = !state.error;
      refs.error.textContent = state.error || "";
      refs.previous.disabled = state.dirty || state.cursor < 0;
      refs.next.disabled = state.dirty || total === 0 || state.cursor >= total - 1;
      refs.play.disabled = state.dirty || total === 0 || (!state.playing && state.cursor >= total - 1);
      refs.reset.disabled = state.dirty || total === 0;
      refs.play.textContent = state.playing ? "Pausar" : "Reproduzir";
    }

    function execute() {
      stopPlayback();
      try {
        const maze = parseMaze(refs.input.value);
        const trace = generateTrace(maze);
        state.maze = maze;
        state.events = trace.events;
        state.result = trace.result;
        state.cursor = -1;
        state.dirty = false;
        state.error = null;
      } catch (error) {
        state.maze = null;
        state.events = [];
        state.result = null;
        state.cursor = -1;
        state.dirty = false;
        state.error = error instanceof Error ? error.message : "Não foi possível interpretar a matriz.";
      }
      render();
    }

    function reset() {
      stopPlayback();
      state.cursor = -1;
      render();
    }

    function step(delta) {
      if (state.dirty || state.events.length === 0) {
        return;
      }
      stopPlayback();
      state.cursor = Math.min(
        state.events.length - 1,
        Math.max(-1, state.cursor + delta)
      );
      render();
    }

    function play() {
      if (state.playing) {
        stopPlayback();
        render();
        return;
      }
      if (state.dirty || state.events.length === 0 || state.cursor >= state.events.length - 1) {
        return;
      }

      state.playing = true;
      render();

      const advance = () => {
        if (!state.playing) {
          return;
        }
        state.cursor += 1;
        render();
        if (state.cursor >= state.events.length - 1) {
          stopPlayback();
          render();
          return;
        }
        state.timer = window.setTimeout(advance, 650);
      };

      state.timer = window.setTimeout(advance, 250);
    }

    refs.execute.addEventListener("click", execute);
    refs.previous.addEventListener("click", () => step(-1));
    refs.next.addEventListener("click", () => step(1));
    refs.play.addEventListener("click", play);
    refs.reset.addEventListener("click", reset);
    refs.input.addEventListener("input", () => {
      stopPlayback();
      state.dirty = true;
      state.error = null;
      render();
    });

    execute();
  }

  function start() {
    document.querySelectorAll("[data-dfs-visualizer]").forEach(initializeVisualizer);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();

