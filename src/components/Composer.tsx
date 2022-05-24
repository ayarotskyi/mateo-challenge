import { Editor, EditorProps } from 'draft-js';
import * as React from 'react';

export const Composer = (props: EditorProps) => {
  return (
    <div>
      <Editor {...props} />
    </div>
  );
};
