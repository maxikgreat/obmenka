export default interface Order {
  id: string;
  name: string;
  buy: number;
  sell: number;
  type: string;
  isCross: boolean;
}
