module.exports = function getMetaRedirect(toPath) {
  let url = toPath.trim();

  const hasProtocol = url.includes('://');
  if (!hasProtocol) {
    const hasLeadingSlash = url.startsWith('/');
    if (!hasLeadingSlash) {
      url = `/${url}`;
    }

    const resemblesFile = url.includes('.');
    if (!resemblesFile) {
      url = `${url}/`.replace(/\/\/+/g, '/');
    }
  }

  return `<script>window.location.href="${url}"</script>`;
};
