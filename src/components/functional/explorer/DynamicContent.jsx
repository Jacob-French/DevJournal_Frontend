import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './DynamicContent.css'
import { CopyIcon } from '../../items/Icons';
import { useApi } from '../../../context/ApiContext';

export function ContentTitle({ content }){

  return (
    <div className="py-3">
      <h2 className="font-[Poppins] font-normal text-xl text-space-900">{content.title}</h2>
    </div>
  )
}

export function ContentText({ content }){

  return (
    <div className="markdown">
      <ReactMarkdown>
        {content.markdown}
      </ReactMarkdown>
    </div>
  )
}

export function ContentImage({ content }){

  const api = useApi()

  return (
    <div className="my-10" >
      {content.title !== "" && <span className="font-[Poppins] font-normal text-base text-space-800 pb-2">{content.title}</span>}
      <div className="flex flex-row justify-center">
        <img src={api.formatMediaUrl(content.image[0].url)} />
      </div>
    </div>
  )
}

export function ContentImageText({ content }){
  
  const api = useApi()

  return (
    <div className="my-10" >
      {content.title !== "" && <span className="font-[Poppins] font-normal text-base text-space-800 pb-2">{content.title}</span>}
      <div className="flex flex-row justify-start">
        {content.image_left && 
          <>
          <div className="flex-1">
            <img src={api.formatMediaUrl(content.image[0].url)} />
          </div>
          <div className="flex-1 markdown flex flex-col justify-center">
            <ReactMarkdown>
              {content.text}
            </ReactMarkdown>
          </div>
          </>
        }
        {! content.image_left && 
          <>
          <div className="flex-1 markdown flex flex-col justify-center">
            <ReactMarkdown>
              {content.text}
            </ReactMarkdown>
          </div>
          <div className="flex-1 flex flex-row justify-center">
            <img src={api.formatMediaUrl(content.image[0].url)} />
          </div>
          </>
        }
        
      </div>
    </div>
  )
}

export function ContentCode({ content }){

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  return (
    <div className={`
      border-1 border-space-300 text-xl bg-space-200 rounded-xl
      my-10 relative
    `}>
      <div className="absolute w-12 h-12 top-0 right-0 flex flex-col justify-center items-center">
        <button className="cursor-pointer" onClick={() => {copyToClipboard(content.code)}}>
          <CopyIcon className="text-space-700 hover:text-space-800 w-5 h-5" />
        </button>
      </div>
      {content.title && (
      <>
        <span className="text-base text-space-800 font-light font-[Poppins] px-5 py-3 block">{content.title}</span>
        <hr className="text-space-300"></hr>
      </>
      )}
      <SyntaxHighlighter 
      language={content.language}
      style={tomorrow} 
      customStyle={{ 
        background: 'transparent',
      }}
      codeTagProps={{
        style: {
          fontSize: '0.875rem',
        }
      }}>
        {content.code}
      </SyntaxHighlighter>
    </div>
  )
}