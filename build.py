import argparse
import datetime as dt
import os
import pathlib
import subprocess
import sys


CONTENT_ROOT = pathlib.Path(__file__).resolve().parent / "content"
ROOT = CONTENT_ROOT.parent
BUILD_ROOT = ROOT

INPUT_DIR = CONTENT_ROOT / "exercicios"
OUTPUT_DIR = CONTENT_ROOT / "handouts"

PANDOC = "pandoc"
PANDOC_FROM = "markdown+pipe_tables+backtick_code_blocks+fenced_divs+raw_html"
TEMPLATE = BUILD_ROOT / "templates" / "tufte-handout.tex"
FILTERS = [
    BUILD_ROOT / "filters" / "message.lua",
    BUILD_ROOT / "filters" / "spacer.lua",
    BUILD_ROOT / "filters" / "graphviz.lua",
    BUILD_ROOT / "filters" / "side-by-side.lua",
]
VERSION = "2026/02"


def handout_inputs(selected_files):
    if selected_files:
        return [pathlib.Path(f).resolve() for f in selected_files]
    return sorted(INPUT_DIR.glob("*.md"))


def output_path_for(source):
    return OUTPUT_DIR / source.with_suffix(".pdf").name


def pandoc_command(source, target):
    today = dt.datetime.now().strftime("%d/%m/%Y %H:%M")
    cmd = [
        PANDOC,
        "-f",
        PANDOC_FROM,
        "-s",
        "--pdf-engine=xelatex",
        "--template",
        str(TEMPLATE),
        "-V",
        f"date={today}",
        "-V",
        f"versao={VERSION}",
        "--resource-path",
        os.pathsep.join([str(source.parent), str(BUILD_ROOT)]),
    ]

    for lua_filter in FILTERS:
        cmd.extend(["--lua-filter", str(lua_filter)])

    cmd.extend([str(source), "-o", str(target)])
    return cmd


def build_pdf(source, dry_run=False):
    target = output_path_for(source)
    target.parent.mkdir(parents=True, exist_ok=True)
    cmd = pandoc_command(source, target)

    if dry_run:
        print(target)
        return

    print(f"Handout {source.relative_to(ROOT)} -> {target.relative_to(ROOT)}", flush=True)
    subprocess.run(cmd, check=True, cwd=BUILD_ROOT)


def main(argv):
    parser = argparse.ArgumentParser(
        description="Gera PDFs dos handouts em content/handouts."
    )
    parser.add_argument(
        "files",
        nargs="*",
        help="Arquivos markdown específicos. Se omitido, gera todos de content/exercicios.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Mostra os PDFs que seriam gerados, sem executar pandoc.",
    )
    args = parser.parse_args(argv)

    sources = handout_inputs(args.files)
    if not sources:
        print(f"Nenhum handout encontrado em {INPUT_DIR}", file=sys.stderr)
        return 1

    for source in sources:
        if not source.exists():
            print(f"Arquivo não encontrado: {source}", file=sys.stderr)
            return 1
        if source.suffix != ".md":
            print(f"Esperado arquivo .md, recebido: {source}", file=sys.stderr)
            return 1
        build_pdf(source, dry_run=args.dry_run)

    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
