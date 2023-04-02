import { useCallback, useMemo, useState } from "react";
import { useQuery } from "urql";
import { RegionCode, regionCodeToName } from "../../formatter/Region";
import { ProTFTButton, ButtonVariant } from "../Button/Button";
import { Drawer } from "./Drawer";
import { StyledDrawerFooter, StyledTitle } from "./Drawer.styled";
import { FilterWrapper } from "./FilterDrawer.styled";
import { FilterGroup } from "./FilterGroup/FilterGroup";
import { SetsQueryResponse, SETS_QUERY } from "./queries";

interface Props {
  isOpen: boolean;
  toggleDrawer: () => void;
  selectedSets: number[];
  selectedRegions: string[];
  setSelectedSets: (value: number[]) => void;
  setSelectedRegions: (value: string[]) => void;
}

export const FilterDrawer = ({
  isOpen,
  toggleDrawer,
  selectedRegions,
  selectedSets,
  setSelectedSets,
  setSelectedRegions,
}: Props) => {
  const [{ data }] = useQuery<SetsQueryResponse>({
    query: SETS_QUERY,
  });

  const [localSelectedSets, setLocalSelectedSets] =
    useState<number[]>(selectedSets);
  const [localSelectedRegions, setLocalSelectedRegions] =
    useState<string[]>(selectedRegions);

  const regionOptions = useMemo(() => {
    return Object.values(RegionCode).map((regionCode) => ({
      label: regionCodeToName(regionCode),
      value: regionCode,
    }));
  }, []);

  const setOptions = useMemo(() => {
    const sortedSets = [...(data?.sets ?? [])].sort((a, b) => b.id - a.id);
    return (
      sortedSets.map(({ id, name }) => ({
        label: `${id} - ${name}`,
        value: id,
      })) ?? []
    );
  }, [data?.sets]);

  const onSubmitFilters = useCallback(() => {
    setSelectedSets(localSelectedSets);
    setSelectedRegions(localSelectedRegions);
    toggleDrawer();
  }, [
    localSelectedRegions,
    localSelectedSets,
    setSelectedRegions,
    setSelectedSets,
    toggleDrawer,
  ]);

  const onClearFilters = useCallback(() => {
    setSelectedRegions([]);
    setSelectedSets([]);
    toggleDrawer();
  }, [setSelectedRegions, setSelectedSets, toggleDrawer]);

  return (
    <Drawer isOpen={isOpen} onClose={toggleDrawer}>
      <StyledTitle>Filter Events</StyledTitle>
      <FilterWrapper>
        <FilterGroup<number>
          title="Sets"
          selectedOptions={localSelectedSets}
          setSelected={setLocalSelectedSets}
          options={setOptions}
        />
        <FilterGroup<string>
          title="Regions"
          selectedOptions={localSelectedRegions}
          setSelected={setLocalSelectedRegions}
          options={regionOptions}
        />
      </FilterWrapper>
      <StyledDrawerFooter>
        <ProTFTButton
          buttonColor="transparent"
          textColor="white"
          variant={ButtonVariant.Transparent}
          width="100%"
          onClick={onClearFilters}
        >
          Clear
        </ProTFTButton>
        <ProTFTButton width="100%" onClick={onSubmitFilters}>
          Filter
        </ProTFTButton>
      </StyledDrawerFooter>
    </Drawer>
  );
};
