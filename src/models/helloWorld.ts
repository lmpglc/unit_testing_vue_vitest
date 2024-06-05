export interface HelloWorldProps {
  msg?: string,
  otra: string
}
export interface HelloWorldEmits {
    (e: string): void,
    (e: string, count: number): void
}