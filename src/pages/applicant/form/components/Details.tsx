import { Paper, Tabs } from "@mantine/core";
function Details() {
  return (
    <Paper bg="dark" p="xl">
      <Tabs>
        <Tabs.List>
          <Tabs.Tab value="personal">Personal</Tabs.Tab>
          <Tabs.Tab value="addresses">Addresses</Tabs.Tab>
          <Tabs.Tab value="working-experience">Working Experience</Tabs.Tab>
          <Tabs.Tab value="character-reference">Character Reference</Tabs.Tab>
          <Tabs.Tab value="employment">Employment</Tabs.Tab>
          <Tabs.Tab value="attachment">Attachment</Tabs.Tab>
          <Tabs.Tab value="requirement">Requirement</Tabs.Tab>
          <Tabs.Tab value="internet-history">Internet History</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Paper>
  );
}

export default Details;
