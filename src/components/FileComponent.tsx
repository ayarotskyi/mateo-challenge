import * as React from 'react';
import { IconBaseProps } from 'react-icons';
import { BsFileEarmark } from 'react-icons/bs';

type Props = IconBaseProps & {
  file: File;
};

const FileComponent: React.FC<Props> = ({ file, ...props }) => {
  const wrapperStyle: React.CSSProperties = React.useMemo(
    () => ({
      maxWidth: props.size,
    }),
    [props.size]
  );

  const fileExtension = file.name.substring(file.name.lastIndexOf('.'));

  const fileName = fileExtension
    ? file.name.substring(0, file.name.lastIndexOf('.'))
    : file.name;

  return (
    <div
      className='m-2 flex w-fit select-none flex-col items-center justify-center rounded-lg border-2 p-1'
      style={wrapperStyle}
    >
      <BsFileEarmark {...props} />
      <div className='flex w-full min-w-0 flex-1 px-2 text-xs'>
        <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
          {fileName}
        </div>
        <div>{fileExtension}</div>
      </div>
    </div>
  );
};

export default React.memo(FileComponent);
