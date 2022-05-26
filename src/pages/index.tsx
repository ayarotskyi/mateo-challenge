import { ContentBlock, convertFromRaw, EditorState } from 'draft-js';
import { filter, map } from 'ramda';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import Composer from '@/components/Composer';

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

  const onSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      const content = editorState.getCurrentContent();
      const files: File[] = map(
        (block: ContentBlock) =>
          content.getEntity(block.getEntityAt(0)).getData(),
        filter(
          (block) =>
            block.getType() === 'atomic' &&
            content.getEntity(block.getEntityAt(0)).getType() === 'file',
          content.getBlocksAsArray()
        )
      );
      // eslint-disable-next-line no-console
      console.log(files);
    },
    [editorState]
  );

  return (
    <main>
      <form onSubmit={onSubmit}>
        <Composer editorState={editorState} onChange={setEditorState} />
        <Button type='submit'>Submit</Button>
      </form>
    </main>
  );
}
