from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma

def build_database():
    print("Loading SofyCode document...")
    loader = PyPDFLoader("sofycode.pdf")
    docs = loader.load()

    print("Splitting text into chunks...")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    splits = text_splitter.split_documents(docs)

    print("Connecting to Ollama for embeddings...")
    # This uses your local Ollama instance instead of the clashing HuggingFace libraries!
    local_embeddings = OllamaEmbeddings(model="nomic-embed-text")

    print("Building local Chroma database...")
    vectorstore = Chroma.from_documents(
        documents=splits, 
        embedding=local_embeddings, 
        persist_directory="./sofycode_db"
    )
    
    print("Database built successfully! You can now run main.py.")

if __name__ == "__main__":
    build_database()