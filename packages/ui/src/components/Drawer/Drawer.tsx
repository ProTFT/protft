interface Props {
  isOpen: boolean;
  toggleDrawer: () => void;
}

export const Drawer = ({ isOpen, toggleDrawer }: Props) => {
  return <div>DrawerTest</div>;
  // const [selectedSets, setSelectedSets] = useState<string[]>([]);
  // const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  // return (
  //   <StyledContainer isOpen={isOpen}>
  //     <div>
  //       <StyledDrawerHeader>
  //         <CloseButtonIcon onClick={toggleDrawer} />
  //       </StyledDrawerHeader>
  //       <StyledDrawerBody>
  //         <StyledTitle>Filter Events</StyledTitle>
  //         <FilterGroup
  //           title="Sets"
  //           setSelected={setSelectedSets}
  //           options={[
  //             { label: "Set 1", value: "1" },
  //             { label: "set 2", value: "2" },
  //           ]}
  //         />
  //         <FilterGroup
  //           title="Regions"
  //           setSelected={setSelectedRegions}
  //           options={[
  //             { label: "Brazil", value: "BR" },
  //             { label: "EMEA", value: "EMEA" },
  //           ]}
  //         />
  //       </StyledDrawerBody>
  //     </div>
  //     <StyledDrawerFooter>
  //       <ProTFTButton
  //         buttonColor="transparent"
  //         textColor="white"
  //         variant={ButtonVariant.Transparent}
  //         width="100%"
  //       >
  //         Clear
  //       </ProTFTButton>
  //       <ProTFTButton width="100%">Filter</ProTFTButton>
  //     </StyledDrawerFooter>
  //   </StyledContainer>
  // );
};
