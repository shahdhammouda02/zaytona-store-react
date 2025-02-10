import { useColorScheme } from '@mui/material/styles';

export default function ColorModeSelect(props) {
  const { mode } = useColorScheme();
  if (!mode) {
    return null;
  }
  // return (
  //   <Select
  //     value={mode}
  //     onChange={(event) => setMode(event.target.value)}
  //     SelectDisplayProps={{
  //       'data-screenshot': 'toggle-mode',
  //     }}
  //     {...props}
  //   >
  //     <MenuItem value="system">System</MenuItem>
  //     <MenuItem value="light">Light</MenuItem>
  //     <MenuItem value="dark">Dark</MenuItem>
  //   </Select>
  // );
}