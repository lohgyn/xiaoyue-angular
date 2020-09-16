export class Util {
  public static createScriptElement(id: string, src: string): void {
    if (document.getElementById(id) === null) {
      const node = document.createElement('script');
      node.id = id;
      node.src = src;
      node.type = 'text/javascript';
      node.async = true;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
}
