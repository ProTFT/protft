import { useQuery } from "urql";
import { Dropdown } from "../../../components/Dropdown/Dropdown";
import { Set } from "../../../graphql/schema";
import { SetsQueryResponse, SETS_QUERY } from "../../Stats/DataSelect/queries";
import {
  SetDropdownContainer,
  StyledAppliedStatFilter,
} from "./SetDropdown.styled";

interface Props {
  onSelectOption: (value: number) => void;
  selectedOption: number;
}

export const SetDropdown = ({ onSelectOption, selectedOption }: Props) => {
  const [{ data: sets }] = useQuery<SetsQueryResponse>({
    query: SETS_QUERY,
  });

  return (
    <InnerSetDropdown
      onSelectOption={onSelectOption}
      selectedOption={selectedOption}
      sets={sets?.sets}
    />
  );
};

interface InnerProps extends Props {
  onSelectOption: (value: number) => void;
  selectedOption: number;
  sets: Set[] | undefined;
}

export const InnerSetDropdown = ({
  onSelectOption,
  selectedOption,
  sets,
}: InnerProps) => {
  const baseOptions = [{ value: 0, label: "All" }];

  const dropdownSetOptions = [
    ...baseOptions,
    ...(sets?.map(({ id }) => ({
      value: id,
      label: `Set ${id}`,
    })) ?? []),
  ];
  return (
    <SetDropdownContainer>
      <Dropdown<number>
        onSelectOption={onSelectOption}
        options={dropdownSetOptions}
        transformer={Number}
      />
      {Boolean(selectedOption) && (
        <StyledAppliedStatFilter>Set {selectedOption}</StyledAppliedStatFilter>
      )}
    </SetDropdownContainer>
  );
};
