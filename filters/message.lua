function Div(d) 
  local colors = {
    tip = "Blue",
    info = "Blue",
    done = "Green",
    warn = "Yellow"
  }
  
  if #d.classes ~= 1 or colors[d.classes[1]] == nil then
    return nil
  end

  local title = ' '
  if #d.content > 1 then
    title = pandoc.write(pandoc.Pandoc({d.content[1]}), 'latex')
    table.remove(d.content, 1)
  end
  
  local c = colors[d.classes[1]]

  return {
    pandoc.RawBlock('latex', '\\begin{box' .. c .. '}{' .. title .. '}'),
    d,
    pandoc.RawBlock('latex', '\\end{box' .. c .. '}')
  }
end
