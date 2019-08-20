import bergerTablesScheduler from "./bergerTablesScheduler";

it("should handle 2 teams", () => {
  const teams = ["A", "B"];

  const rounds = bergerTablesScheduler(teams);

  expect(rounds).toEqual([[["A", "B"]]]);
});

it("should handle 3 teams", () => {
  const teams = ["A", "B", "C"];

  const rounds = bergerTablesScheduler(teams);

  expect(rounds).toEqual([[["A", "C"]], [["C", "B"]], [["A", "B"]]]);
});

it("should handle 4 teams", () => {
  const teams = ["A", "B", "C", "D"];

  const rounds = bergerTablesScheduler(teams);

  expect(rounds).toEqual([
    [["A", "C"], ["B", "D"]],
    [["A", "D"], ["C", "B"]],
    [["A", "B"], ["D", "C"]]
  ]);
});

it("should handle 5 teams", () => {
  const teams = ["A", "B", "C", "D", "E"];

  const rounds = bergerTablesScheduler(teams);

  expect(rounds).toEqual([
    [["A", "D"], ["B", "E"]],
    [["A", "E"], ["B", "C"]],
    [["E", "C"], ["D", "B"]],
    [["A", "C"], ["E", "D"]],
    [["A", "B"], ["C", "D"]]
  ]);
});

it("should handle 6 teams", () => {
  const teams = ["A", "B", "C", "D", "E", "F"];

  const rounds = bergerTablesScheduler(teams);

  expect(rounds).toEqual([
    [["A", "D"], ["B", "E"], ["C", "F"]],
    [["A", "E"], ["D", "F"], ["B", "C"]],
    [["A", "F"], ["E", "C"], ["D", "B"]],
    [["A", "C"], ["F", "B"], ["E", "D"]],
    [["A", "B"], ["C", "D"], ["F", "E"]]
  ]);
});

it("should handle 8 teams", () => {
  const teams = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const rounds = bergerTablesScheduler(teams);

  expect(rounds).toEqual([
    [["A", "E"], ["B", "F"], ["C", "G"], ["D", "H"]],
    [["A", "F"], ["E", "G"], ["B", "H"], ["C", "D"]],
    [["A", "G"], ["F", "H"], ["E", "D"], ["B", "C"]],
    [["A", "H"], ["G", "D"], ["F", "C"], ["E", "B"]],
    [["A", "D"], ["H", "C"], ["G", "B"], ["F", "E"]],
    [["A", "C"], ["D", "B"], ["H", "E"], ["G", "F"]],
    [["A", "B"], ["C", "E"], ["D", "F"], ["H", "G"]]
  ]);
});
