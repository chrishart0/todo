/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      owner
      friends
      ToDoItems {
        items {
          id
          title
          description
          createdAt
          updatedAt
          userToDoItemsOwner
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      owner
      friends
      ToDoItems {
        items {
          id
          title
          description
          createdAt
          updatedAt
          userToDoItemsOwner
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      owner
      friends
      ToDoItems {
        items {
          id
          title
          description
          createdAt
          updatedAt
          userToDoItemsOwner
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createToDoItem = /* GraphQL */ `
  mutation CreateToDoItem(
    $input: CreateToDoItemInput!
    $condition: ModelToDoItemConditionInput
  ) {
    createToDoItem(input: $input, condition: $condition) {
      id
      title
      description
      createdAt
      updatedAt
      userToDoItemsOwner
      owner
    }
  }
`;
export const updateToDoItem = /* GraphQL */ `
  mutation UpdateToDoItem(
    $input: UpdateToDoItemInput!
    $condition: ModelToDoItemConditionInput
  ) {
    updateToDoItem(input: $input, condition: $condition) {
      id
      title
      description
      createdAt
      updatedAt
      userToDoItemsOwner
      owner
    }
  }
`;
export const deleteToDoItem = /* GraphQL */ `
  mutation DeleteToDoItem(
    $input: DeleteToDoItemInput!
    $condition: ModelToDoItemConditionInput
  ) {
    deleteToDoItem(input: $input, condition: $condition) {
      id
      title
      description
      createdAt
      updatedAt
      userToDoItemsOwner
      owner
    }
  }
`;
