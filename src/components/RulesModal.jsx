import ReactMarkdown from 'react-markdown';
import a11yEmoji from '@fec/remark-a11y-emoji';
import rehypeStringify from 'rehype-stringify';
import { ReactSVG } from 'react-svg';

import rules from '../assets/rules.md?raw';
import crossSvg from '../assets/icons/cross.svg';

export default function StoreModal({ close }) {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full text-center">
          <div className="flex flex-col text-left transition-all transform bg-red-500 rounded-lg shadow-xl w-[700px] sm:my-8">
            <button
              className="absolute p-2 top-2 right-2"
              onClick={close}
            >
              <ReactSVG
                src={crossSvg}
                className="w-5 h-5 text-gray-400 transform rotate-45 stroke-current"
              />
            </button>
            <div className="p-8 bg-white">
              <ReactMarkdown
                remarkPlugins={[a11yEmoji]}
                rehypePlugins={[rehypeStringify]}
                className="whitespace-pre-line word-break"
              >
                {rules}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
