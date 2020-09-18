export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'danger';
  text: string;
  action?: {
    text: string;
    obj: any;
    click(obj: any): any;
  };
}
