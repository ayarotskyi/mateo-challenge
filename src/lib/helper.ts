import { AtomicBlockUtils, EditorState } from 'draft-js';

export const insertFile = (editorState: EditorState, file: File) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'file',
    'IMMUTABLE',
    file
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
};
