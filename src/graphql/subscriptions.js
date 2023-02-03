/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreateToDoItem = /* GraphQL */ `
  subscription OnCreateToDoItem(
    $filter: ModelSubscriptionToDoItemFilterInput
    $owner: String
  ) {
    onCreateToDoItem(filter: $filter, owner: $owner) {
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
export const onUpdateToDoItem = /* GraphQL */ `
  subscription OnUpdateToDoItem(
    $filter: ModelSubscriptionToDoItemFilterInput
    $owner: String
  ) {
    onUpdateToDoItem(filter: $filter, owner: $owner) {
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
export const onDeleteToDoItem = /* GraphQL */ `
  subscription OnDeleteToDoItem(
    $filter: ModelSubscriptionToDoItemFilterInput
    $owner: String
  ) {
    onDeleteToDoItem(filter: $filter, owner: $owner) {
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
