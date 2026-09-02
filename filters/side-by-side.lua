function Div(d)
  if #d.classes ~= 1 or d.classes[1] ~= 'side-by-side' then
    return nil
  end
  print('side by side!!!')
  print(d.content[1])
  
  return {
    pandoc.RawBlock('latex', '\\noindent\\begin{minipage}{0.45\\textwidth}'),
    d.content[1],
    pandoc.RawBlock('latex', '\\end{minipage}\\hspace{0.05\\textwidth}\\begin{minipage}{0.45\\textwidth}'),
    d.content[2],
    pandoc.RawBlock('latex', '\\end{minipage}')
  }


end
