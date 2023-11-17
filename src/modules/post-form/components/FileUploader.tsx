import React, { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';

import { Button } from '../../../components/ui/button';

type FileUploaderProps = {
	fieldChange: (FILES: File[]) => void;
	mediaUrl: string;
	forwardedRef?: React.Ref<HTMLDivElement>;
};

const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
	({ fieldChange, mediaUrl }, ref) => {
		const [file, setFile] = useState<File[]>([]);
		const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

		const onDrop = useCallback(
			(acceptedFiles: FileWithPath[]) => {
				setFile(acceptedFiles);
				fieldChange(acceptedFiles);
				setFileUrl(URL.createObjectURL(acceptedFiles[0]));
			},

			// eslint-disable-next-line react-hooks/exhaustive-deps
			[file]
		);

		const { getRootProps, getInputProps } = useDropzone({
			onDrop,
			accept: { 'image/*': ['.png', '.jpeg', '.jpg', '.svg'] },
		});

		return (
			<div
				ref={ref}
				{...getRootProps()}
				className="flex flex-col justify-center items-center rounded-xl cursor-pointer bg-dark-3"
			>
				<input {...getInputProps()} className="cursor-pointer" />

				{fileUrl ? (
					<>
						<div className="w-full flex-1 flex justify-center p-5 lg:p-10">
							<img
								src={fileUrl}
								alt="image"
								className={cn(
									'h-80 lg:h-[480px] w-full rounded-[8px]',
									'object-cover object-center'
								)}
							/>
						</div>

						<p
							className={cn(
								'w-full p-4 border-t border-t-dark-4',
								'text-light-4 text-center text-[14px] font-normal leading-[140%]'
							)}
						>
							Click or drag photo to replace
						</p>
					</>
				) : (
					<div
						className={cn(
							'flex flex-col justify-center items-center',
							'p-7 h-80 lg:h-[612px]'
						)}
					>
						<img
							src="/assets/icons/file-upload.svg"
							alt="file-upload"
							width={96}
							height={77}
						/>

						<h3
							className={cn(
								'text-light-2 text-[16px] font-medium leading-[140%]',
								'mb-2 mt-6'
							)}
						>
							Drag photo here
						</h3>
						<p
							className={cn(
								'text-light-4 text-[16px] font-normal leading-[140%]',
								'mb-6'
							)}
						>
							SVG, PNG, JPEG
						</p>

						<Button className={cn('h-12 flex gap-2 px-5 bg-dark-4', 'text-light-1')}>
							Select from computer
						</Button>
					</div>
				)}
			</div>
		);
	}
);

export default FileUploader;
