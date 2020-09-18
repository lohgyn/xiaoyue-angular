export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'danger';
  text: string;
}
