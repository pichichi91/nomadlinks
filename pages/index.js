import Head from 'next/head'
import { getDatabase } from '../lib/notion';
import Image from 'next/image'

export default function Home({ links, hasMore }) {

  const defaultImage = "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

  console.log({ links, hasMore })
  return (
    <div>
      <Head>
        <title>NomadLinks</title>
      </Head>

      <header className="container mx-auto mt-20 p-4">
        <h1 className="drop-shadow text-center text-8xl font-black font-lobster text-green-700">NomadLinks</h1>

      </header>

      <main >

        <div className="container mb-16 mx-auto mt-12 p-4 rounded-3xl border-2 border-green-100	 bg-white shadow-2xl">

          <div className="ml-6 mt-8 flex flex-wrap">


            {links.map((linkItem) => (<div className="mx-4 lg:mx-6 mb-16" key={linkItem.id}>
              <div className="w-80">
              <a target="_blank" href={linkItem.url} rel="noopener noreferrer">

                <Image
                  className="opacity-70 hover:opacity-100 transition-opacity  duration-300 ease-in-out		 rounded-xl object-cover"
                  width={350}
                  height={250}
                  src={linkItem.image || defaultImage}
                  alt={linkItem.name}
                  blurDataURL={defaultImage}
                  placeholder="blur"
                />

              </a>

              </div>


              <h2 className="font-roboto my-2 text-2xl text-green-800 font-black">{linkItem.name}</h2>


            </div>))}
          </div>
        </div>

      </main>

      <footer >

      </footer>
    </div>
  )
}

export const getStaticProps = async () => {

  const databaseId = process.env.NOTION_DATABASE
  const { results: links, hasMore } = await getDatabase(databaseId);

  return {
    props: {
      links,
      hasMore
    },
    revalidate: 1,
  }
}
