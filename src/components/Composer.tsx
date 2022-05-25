import {
  AtomicBlockUtils,
  ContentBlock,
  DraftEditorCommand,
  DraftHandleValue,
  Editor,
  EditorProps,
  EditorState,
  RichUtils,
} from 'draft-js';
import { reduce } from 'ramda';
import * as React from 'react';

const insertFile = (editorState: EditorState, file: Blob) => {
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

const Composer = (props: EditorProps) => {
  const handleKeyCommand = React.useCallback(
    (command: DraftEditorCommand, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        props.onChange(newState);
        return 'handled';
      }

      return 'not-handled';
    },
    [props]
  );

  const handlePastedFiles = (files: Blob[]): DraftHandleValue => {
    props.onChange(reduce(insertFile, props.editorState, files));

    return 'handled';
  };

  const renderFiles = React.useCallback(
    (block: ContentBlock) => {
      const content = props.editorState.getCurrentContent();
      const entityKey = block.getEntityAt(0);

      if (entityKey && block.getType() === 'atomic') {
        const entity = content.getEntity(entityKey);

        if (entity?.getType() === 'file') {
          return {
            component: () => <div className='h-10 w-10 bg-red-900'></div>,
            editable: false,
          };
        }
      }
    },
    [props.editorState]
  );

  return (
    <Editor
      {...props}
      handleKeyCommand={handleKeyCommand}
      handlePastedFiles={handlePastedFiles}
      blockRendererFn={renderFiles}
    />
  );
};

export default React.memo(Composer);
