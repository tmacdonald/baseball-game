import Action from "./Action";

export default interface ActionCreator {
  (): Action;
}
