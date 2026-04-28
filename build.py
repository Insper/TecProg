import subprocess
import pathlib
import os.path as osp
import functools
import argparse

DEBUG=True

sh = functools.partial(subprocess.run, check=True, shell=True, capture_output=not DEBUG)
DATE_CMD = 'date +\"%d/%m/%Y %H:%M\"'
PANDOC_HANDOUT = 'pandoc -f markdown+pipe_tables+backtick_code_blocks+fenced_divs+raw_html --lua-filter=filters/message.lua --lua-filter=filters/spacer.lua --lua-filter=filters/graphviz.lua --lua-filter=filters/side-by-side.lua  -s --template templates/tufte-handout.tex '
PANDOC_PAGE = 'pandoc -f markdown+pipe_tables+backtick_code_blocks+fenced_divs+raw_html --toc --toc-depth=1 -s --template templates/template-index.html '
PANDOC_VARS = f'-V date="$({DATE_CMD})" -V versao="2026/01"'
MARP_CMD = 'npx @marp-team/marp-cli  --theme templates/slides.css  --allow-local-files --html '


src = pathlib.Path('src')


def parse_args():
    parser = argparse.ArgumentParser(description='Build material from src/ into docs/.')
    parser.add_argument(
        'files',
        nargs='*',
        help='Specific files/directories to build (default: everything under src/).',
    )
    parser.add_argument(
        '--only',
        choices=['all', 'page', 'handout', 'slides', 'assets'],
        default='all',
        help='Restrict build output kind (default: all).',
    )
    return parser.parse_args()


def should_build(kind, only):
    return only == 'all' or only == kind

args = parse_args()

if args.files:
    all_files = [pathlib.Path(f) for f in args.files]
    show_file_list = True
else:
    all_files = src.rglob('*')
    show_file_list = False
sh('mkdir -p temp')

for f in all_files:
    dir, fname = osp.split(f)
    without_src = "docs" / f.relative_to('src')
    

    if osp.isdir(f):
        if not show_file_list:
            print('Creating dir', without_src)
        sh(f'mkdir -p {without_src}')
    elif fname.endswith('.md') and 'handout' in fname and should_build('handout', args.only):
        resname = without_src.parent / fname.replace('.md', '.pdf')
        if show_file_list:
            print(resname)
        else:
            print('Handout', f)
        sh(f'{PANDOC_HANDOUT} {PANDOC_VARS} --resource-path {dir} {f} -o {resname}')
    elif fname.endswith('.md') and 'slide' in fname and should_build('slides', args.only):
        resname = without_src.parent / fname.replace('.md', '.pdf')
        if show_file_list:
            print(resname)
        else:
             print('Slides', f)
        sh(f'{MARP_CMD} -o {resname} {f}')
    elif (
        fname.endswith('.md')
        and 'handout' not in fname
        and 'slide' not in fname
        and should_build('page', args.only)
    ):
        resname = without_src.parent / fname.replace('.md', '.html')
        if show_file_list:
            print(resname)
        else:
            print('Page', f)
        sh(f'{PANDOC_PAGE} {PANDOC_VARS} --resource-path {dir} {f} -o {resname}')
    elif should_build('assets', args.only):
        
        if show_file_list:
            print(f)
        else:
            print('copy', f)
        sh(f'cp {f} {without_src}')
