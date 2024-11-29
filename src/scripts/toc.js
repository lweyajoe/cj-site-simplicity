export const generateTableOfContents = (content) => {
  if (!content) return '';
  
  // Create a temporary div to parse HTML content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  
  // Find all h3 tags
  const headings = tempDiv.querySelectorAll('h3');
  let toc = '';
  
  // Generate TOC HTML
  headings.forEach((heading, index) => {
    const id = `heading-${index + 1}`;
    heading.id = id;
    toc += `<li><a href="#${id}">${heading.textContent}</a></li>`;
  });
  
  return toc;
};