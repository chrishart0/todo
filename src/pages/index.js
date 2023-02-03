import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API, graphqlOperation } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listNotes, getUser } from "../graphql/queries";
import {
  createUser as createUserMutation,
  createNote as createNoteMutation,
  createToDoItem as createToDoItemMutation,
  deleteNote as deleteNoteMutation,
} from "../graphql/mutations";

const App = ({ signOut, user }) => {
  const [userModel, setUserModel] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchNotes();
  }, []);

  // Fetch the user, if there is no user for signed in user then create a new one
  async function fetchUser() {
    console.log("Fetching user")
    const apiData = await API.graphql({ query: getUser, variables: { owner: user.username } });
    if (apiData.data.getUser !== undefined && apiData.data.getUser !== null ) {
      const userFromAPI = apiData.data.getUser;
      console.log("Found user: ", userFromAPI)
      setUserModel(userFromAPI);
    } else {
      console.log("Creating user")
      createUser();
    }
  }

  // Create new user with hardcoded friend for testing purposes
  async function createUser() {
    const data = {
      owner: user.username,
      friends: ['test2'],

    };
    await API.graphql({
      query: createUserMutation,
      variables: { input: data },
    });
    fetchUser(); //ToDo: Move to then
  }

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    };
    const dataToDo = {
      title: form.get("name"),
      description: form.get("description"),
      userToDoItemsOwner: user.username
    };
    // await API.graphql({
    //   query: createNoteMutation,
    //   variables: { input: data },
    // });
    await API.graphql(graphqlOperation(createNoteMutation, { input: data }))
    await API.graphql(graphqlOperation(createToDoItemMutation, { input: dataToDo }))


    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
    fetchNotes();
  }

  return (
    <View className="App">
      <Heading level={1}>{user.username}&apos;s ToDo list</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
      </View>
      <Heading level={2}>My ToDo Items</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.name}
            </Text>
            <Text as="span">{note.description}</Text>
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);