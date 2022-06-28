import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation signup($input: SignupInput!) {
    signup(input: $input) {
      created_at
      email
      id
      password
      updated_at
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      users {
        created_at
        email
        id
        password
        updated_at
      }
      users_id
    }
  }
`;

export const CREATE_FOLDER = gql`
  mutation createFolder($input: CreateFolderInput!) {
    createFolder(input: $input) {
      created_at
      id
      name
      notes {
        content
        created_at
        folder {
          created_at
          id
          name
          notes {
            content
            created_at
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        id
        updated_at
        users {
          created_at
          email
          folders {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
          }
          password
          updated_at
        }
      }
      updated_at
      users {
        created_at
        email
        folders {
          created_at
          id
          name
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          updated_at
          users {
            created_at
            email
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        id
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            password
            updated_at
          }
        }
        password
        updated_at
      }
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation createNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      content
      created_at
      folder {
        created_at
        id
        name
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        updated_at
        users {
          created_at
          email
          folders {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          password
          updated_at
        }
      }
      id
      updated_at
      users {
        created_at
        email
        folders {
          created_at
          id
          name
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          updated_at
          users {
            created_at
            email
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        id
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            password
            updated_at
          }
        }
        password
        updated_at
      }
    }
  }
`;

export const GET_FOLDERS = gql`
  query folders($input: GetFoldersInput!) {
    folders(input: $input) {
      created_at
      id
      name
      notes {
        content
        created_at
        folder {
          created_at
          id
          name
          notes {
            content
            created_at
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        id
        updated_at
        users {
          created_at
          email
          folders {
            created_at
            id
            name
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
          }
          password
          updated_at
        }
      }
      updated_at
      users {
        created_at
        email
        folders {
          created_at
          id
          name
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          updated_at
        }
        id
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            password
            updated_at
          }
        }
        password
        updated_at
      }
    }
  }
`;

export const GET_FOLDER_BY_ID = gql`
  query folder($id: String!) {
    folder(id: $id) {
      created_at
      id
      name
      notes {
        content
        created_at
        folder {
          created_at
          id
          name
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        id
        updated_at
        users {
          created_at
          email
          folders {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
          }
          password
          updated_at
        }
      }
      updated_at
      users {
        created_at
        email
        folders {
          created_at
          id
          name
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          updated_at
          users {
            created_at
            email
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        id
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
          }
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            password
            updated_at
          }
        }
        password
        updated_at
      }
    }
  }
`;

export const UPDATE_FOLDER_BY_ID = gql`
  mutation updateFolderById($input: UpdateFolderByIdInput!) {
    updateFolderById(input: $input)
  }
`;

export const DELETE_FOLDER_BY_ID = gql`
  mutation deleteFolderById($input: DeleteFolderByIdInput!) {
    deleteFolderById(input: $input)
  }
`;

export const GET_NOTES = gql`
  query notes($input: GetNotesInput!) {
    notes(input: $input) {
      content
      created_at
      folder {
        created_at
        id
        name
        notes {
          content
          created_at
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        updated_at
        users {
          created_at
          email
          folders {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          notes {
            content
            created_at
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          password
          updated_at
        }
      }
      id
      updated_at
      users {
        created_at
        email
        folders {
          created_at
          id
          name
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
          }
          updated_at
          users {
            created_at
            email
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        id
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          updated_at
        }
        password
        updated_at
      }
    }
  }
`;

export const GET_TRASHS = gql`
  query trashs($input: GetTrashsInput!) {
    trashs(input: $input) {
      content
      created_at
      folder {
        created_at
        id
        name
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        updated_at
        users {
          created_at
          email
          folders {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          password
          updated_at
        }
      }
      id
      updated_at
      users {
        created_at
        email
        folders {
          created_at
          id
          name
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          updated_at
          users {
            created_at
            email
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        id
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            password
            updated_at
          }
        }
        password
        updated_at
      }
    }
  }
`;

export const GET_NOTES_BY_ID = gql`
  query note($id: String!) {
    note(id: $id) {
      content
      created_at
      folder {
        created_at
        id
        name
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        updated_at
        users {
          created_at
          email
          folders {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          password
          updated_at
        }
      }
      id
      updated_at
      users {
        created_at
        email
        folders {
          created_at
          id
          name
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          updated_at
          users {
            created_at
            email
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        id
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            password
            updated_at
          }
        }
        password
        updated_at
      }
    }
  }
`;

export const UPDATE_NOTE_BY_ID = gql`
  mutation updateNoteById($input: UpdateNoteByIdInput!) {
    updateNoteById(input: $input)
  }
`;

export const DELETE_NOTE_BY_ID = gql`
  mutation deleteNoteById($input: DeleteNoteByIdInput!) {
    deleteNoteById(input: $input)
  }
`;

export const HARD_DELETE_NOTE_BY_ID = gql`
  mutation hardDeleteNoteById($input: DeleteNoteByIdInput!) {
    hardDeleteNoteById(input: $input)
  }
`;

export const HARD_DELETE_ALL_NOTES = gql`
  mutation hardDeleteAllNotes($input: DeleteAllNotesInput!) {
    hardDeleteAllNotes(input: $input)
  }
`;
