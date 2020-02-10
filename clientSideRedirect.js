module.exports = function getMetaRedirect(toPath) {
  let url = toPath.trim();

  const hasProtocol = url.includes('://');
  if (!hasProtocol) {
    const hasLeadingSlash = url.startsWith('/');
    const hasTrailingSlash = url.endsWith('/');
    
    if (!hasLeadingSlash) {
      url = `/${url}`;
    }
    
    if(hasTrailingSlash) {
      url = url.slice(0, -1);
    }

    const resemblesFile = url.includes('.');
    if (!resemblesFile) {
      url = `${url}`.replace(/\/\/+/g, '/');
    }
  }

  return `<script>window.location.href="${url}"</script>`;
};
