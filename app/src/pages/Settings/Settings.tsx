import {
  Avatar,
  Box,
  Button, Chip,
  CircularProgress,
  FormControl,
  InputLabel, MenuItem, OutlinedInput,
  Select,
  TextField,
  Typography
} from '@mui/material';
import ThemeSwitcher from './components/ThemeSwitcher';
import {useUpdateUserQuery, useUserQuery} from "src/queries/useUserQuery.ts";
import {useState} from "react";
import {useTagsQuery} from "src/queries/useTagsQuery.ts";
import {useAxios} from "src/hooks/useAxios.ts";
import {API} from "src/constants/api_routes.ts";
import {User} from "src/types.ts";

export default function Settings() {
  const {data: user, isLoading: loadingUser} = useUserQuery()
  const [avatar, setAvatar] = useState<string>("")

  // const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const fileReader = new FileReader();
  //     fileReader.onload = () => {
  //       if (fileReader.readyState === 2) {
  //         setAvatar(fileReader.result as string);
  //       }
  //     };
  //     fileReader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  if (loadingUser || user === undefined) {
    return (
      <Box sx={{
        width: "100%",
        height: "calc(100vh - 128px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <CircularProgress/>
      </Box>
    )
  }

  return (
    <Box sx={{
      width: "100%",
      height: "calc(100vh - 128px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <Typography variant="h4" sx={{marginBottom: '2rem', marginTop: "2rem"}}>
        Ustawienia profilu
      </Typography>

      <Typography variant="h6" sx={{marginBottom: '1rem'}}>
        Edytuj profil
      </Typography>

      <Avatar
        src={user.avatar}
        sx={{width: 100, height: 100, marginBottom: '1rem'}}
      />
      <Button variant="contained" component="label" sx={{marginBottom: "2rem"}}>
        Zmień awatar
        <input
          type="file"
          accept="image/*"
          hidden
          // onChange={handleAvatarChange}
        />
      </Button>

      <TextField
        label="Imię"
        variant="outlined"
        fullWidth
        sx={{marginTop: '16px', marginBottom: "2rem", maxWidth: "25rem"}}
        value={user.first_name}
        // onChange={(e) => onNameChange(e.target.value)}
      />

      <PreferencesList/>

      <ThemeSwitcher/>

    </Box>
  );
};

function PreferencesList() {
  const axios = useAxios();
  const {data: user} = useUserQuery();
  const updateUserQuery = useUpdateUserQuery();
  const {data: options = []} = useTagsQuery();

  return <FormControl sx={{m: 1, width: 300}}>
    <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
    <Select
      labelId="demo-multiple-chip-label"
      id="demo-multiple-chip"
      multiple
      value={user?.preferences || []}
      onChange={async (e) => {
        const response = await axios.patch<User>(API.userPreferences, {preferences: e.target.value})
        updateUserQuery(response.data)
      }}
      input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
      renderValue={(selected) => (
        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
          {selected.map((value: string) => (
            <Chip key={value} label={value}/>
          ))}
        </Box>
      )}
      // MenuProps={MenuProps}
    >
      {options.map((tag) => (
        <MenuItem key={tag} value={tag}>{tag}</MenuItem>
      ))}
    </Select>
  </FormControl>

}