import os
from css_html_js_minify import css_minify, html_minify

def package_files(src_folder, output_file):
    """Combine and minify HTML and CSS files into a single file."""
    html_path = os.path.join(src_folder, 'index.html')
    css_path = os.path.join(src_folder, 'style.css')

    if not os.path.exists(html_path):
        raise FileNotFoundError(f"{html_path} not found.")
    if not os.path.exists(css_path):
        raise FileNotFoundError(f"{css_path} not found.")

    # Read and minify CSS
    with open(css_path, 'r') as css_file:
        css_content = css_file.read()
        minified_css = css_minify(css_content)

    # Read and minify HTML
    with open(html_path, 'r') as html_file:
        html_content = html_file.read()
        minified_html = html_minify(html_content)

    # Replace the CSS <link> tag with an inline <style> block
    combined_html = minified_html.replace(
        '<link rel=stylesheet  href="./style.css">',
        f'<style>{minified_css}</style>'
    )

    # Write the combined HTML to the output file
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w') as output:
        output.write(combined_html)

    print(f"Packaged file created at: {output_file}")

# Run the script
src_folder = 'src'
output_file = './deploy/index.html'
package_files(src_folder, output_file)
