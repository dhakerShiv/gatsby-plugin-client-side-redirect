const clientSideRedirect = require('../clientSideRedirect');

describe('clientSideRedirect', () => {
  it('wraps path in forward slashes', () => {
    expect(clientSideRedirect('toPath')).toMatchSnapshot();
  });

  it('allows existing leading and trailing forward slashes', () => {
    expect(clientSideRedirect('/toPath/')).toMatchSnapshot();
  });

  it('trims leading and trailing whitespace', () => {
    expect(clientSideRedirect(' toPath ')).toMatchSnapshot();
  });

  it('handles deep paths', () => {
    expect(clientSideRedirect('a/b/c/d')).toMatchSnapshot();
  });

  it('handles offset wrapping forward slashes', () => {
    expect(clientSideRedirect('a/b/c/')).toMatchSnapshot();
  });

  it('replaces duplicate slashes with single slash', () => {
    expect(clientSideRedirect('topath//a')).toMatchSnapshot();
  });

  it('leaves full urls untouched', () => {
    expect(clientSideRedirect('http://example.com')).toMatchSnapshot();
    expect(clientSideRedirect('http://example.com/')).toMatchSnapshot();
    expect(clientSideRedirect('http://example.com/a/b/c')).toMatchSnapshot();
  });

  it('handles redirecting to root', () => {
    expect(clientSideRedirect('/')).toMatchSnapshot();
  });

  it('handles redirecting to a file', () => {
    expect(clientSideRedirect('/test.txt')).toMatchSnapshot();
  });

  it('handles redirecting to a file in a folder', () => {
    expect(clientSideRedirect('a/b/test.txt')).toMatchSnapshot();
  });

  it('handles not using xyz/index.html when the file ends with .html', () => {
    expect(clientSideRedirect('a/b/c/d.html')).toEqual(`<script>window.location.href="/a/b/c/d.html"</script>`)
    expect(clientSideRedirect('a/b/c/index.html')).toEqual(`<script>window.location.href="/a/b/c/index.html"</script>`)
    expect(clientSideRedirect('a/b.html')).toEqual(`<script>window.location.href="/a/b.html"</script>`)
  });

});
