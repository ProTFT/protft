import { AltText400 } from "../../design/fonts/NewFonts";
import { PointContainer, TableStyled } from "./Table.styled";

const mockData = {
  rank: 1,
  name: "setsuko",
  points: 40,
  positions: [1, 2, 3, 4, 5, 6],
  qualified: true,
};

const example = [
  mockData,
  mockData,
  mockData,
  mockData,
  mockData,
  mockData,
  mockData,
  mockData,
];

export const Table = () => {
  return (
    <TableStyled>
      <thead>
        <tr>
          <th align="left" style={{ width: "5%" }}>
            Rank
          </th>
          <th align="left" style={{ width: "15%" }}>
            Name
          </th>
          <th align="left" style={{ width: "10%" }}>
            P
          </th>
          <th align="left" style={{ width: "10%" }}>
            R1
          </th>
          <th align="left" style={{ width: "10%" }}>
            R2
          </th>
          <th align="left" style={{ width: "10%" }}>
            R3
          </th>
          <th align="left" style={{ width: "10%" }}>
            R4
          </th>
          <th align="left" style={{ width: "10%" }}>
            R5
          </th>
          <th align="left" style={{ width: "10%" }}>
            R6
          </th>
          <th align="left" style={{ width: "5%" }} />
        </tr>
      </thead>
      <tbody>
        {example.map((data) => (
          <tr>
            <td style={{ width: "5%" }}>{data.rank}</td>
            <td style={{ width: "15%" }}>{data.name}</td>
            <td style={{ width: "10%" }}>
              <PointContainer>{data.points}</PointContainer>
            </td>
            {data.positions.map((position) => (
              <td style={{ width: "10%" }}>
                <PointContainer>{position}</PointContainer>
              </td>
            ))}
            {data.qualified && <td style={{ width: "5%" }}>Qualified</td>}
          </tr>
        ))}
      </tbody>
    </TableStyled>
  );
};
