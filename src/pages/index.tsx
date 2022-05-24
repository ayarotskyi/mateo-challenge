import { convertFromRaw, EditorState } from 'draft-js';
import * as React from 'react';

import { Composer } from '@/components/Composer';

export default function HomePage() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(
      convertFromRaw({
        entityMap: {},
        blocks: [
          {
            text: '',
            key: 'foo',
            type: 'unstyled',
            entityRanges: [],
            depth: 0,
            inlineStyleRanges: [],
          },
        ],
      })
    )
  );

  return (
    <main>
      <Composer editorState={editorState} onChange={setEditorState} />
    </main>
  );
}
