import { createLobbyName } from "./lobby.logic";

describe("Lobby logic", () => {
  describe("createLobbyName", () => {
    it("should create simple name based on sequences", () => {
      const result = createLobbyName(1, 1);
      expect(result).toBe("A1");
    });

    it("should change letter based on lobby sequence", () => {
      const result = createLobbyName(1, 2);
      expect(result).toBe("B1");
    });

    it("should change number based on lobby group sequence", () => {
      const result = createLobbyName(2, 1);
      expect(result).toBe("A2");
    });

    it("if lobby sequence is bigger than Z, should start repeating letter", () => {
      expect(createLobbyName(1, 26)).toBe("Z1");
      expect(createLobbyName(1, 27)).toBe("AA1");
      expect(createLobbyName(1, 28)).toBe("AB1");
      expect(createLobbyName(1, 52)).toBe("AZ1");
      expect(createLobbyName(1, 53)).toBe("BA1");
      expect(createLobbyName(1, 78)).toBe("BZ1");
      expect(createLobbyName(1, 79)).toBe("CA1");
    });
  });
});
