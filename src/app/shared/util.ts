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

  public static getLineChickDataUri(): string {
    return 'data:image/png;base64,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';
  }
}
