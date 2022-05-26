import {
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

import { insertFile } from '@/lib/helper';

import FileComponent from '@/components/FileComponent';

const Composer: React.FC<EditorProps> = (props) => {
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

  const handlePastedFiles = (files: File[]): DraftHandleValue => {
    props.onChange(reduce(insertFile, props.editorState, files));

    return 'handled';
  };

  const renderFile = React.useCallback(
    (block: ContentBlock) => {
      const content = props.editorState.getCurrentContent();
      const entityKey = block.getEntityAt(0);

      if (entityKey && block.getType() === 'atomic') {
        const entity = content.getEntity(entityKey);

        if (entity?.getType() === 'file') {
          return {
            component: () => (
              <FileComponent file={entity.getData()} size={100} />
            ),
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
      blockRendererFn={renderFile}
    />
  );
};

export default React.memo(Composer);
