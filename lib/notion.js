import { Client } from "@notionhq/client";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const parseProperties = (properties) => {

    const { URL, Name, Tags, Image, Published } = properties

    const url = URL ? URL.url : ""
    const name = Name.title[0] ? Name.title[0].plain_text : ""
    const tags = Tags.multi_select && Tags.multi_select.map((tag) => tag.name)
    const image = Image.files.length > 0 ? Image.files[0].file.url : ""
    const published = Published.checkbox

    return { url, name, tags, image, published }

}

const parseResults = (response) => {
    const { has_more: hasMore, results: receivedResults } = response

    const results = receivedResults.map(item => {
        const { id, properties, created_time: createdTime, last_edited_time: editedTime } = item
        const { url, name, tags, image, published } = parseProperties(properties)

        return {
            id,
            createdTime,
            editedTime,
            name,
            url,
            tags,
            image,
            published
        }

    }).filter(item => item.name && item.published)

    return { hasMore, results }
}


const getDatabase = async (databaseId) => {
    const response = await notion.databases.query({
        database_id: databaseId,
    });

    const data = parseResults(response)

    return data;
};


export { getDatabase }