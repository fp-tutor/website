import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'mock-tests')

export function getSortedPostsData() {
  // Get file names under /mock-tests
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".json" from file name to get id
    const id = fileName.replace(/\.json$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Combine the data with the id
    return {
      id,
      ...JSON.parse(fileContents),
    }
  })
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'sat-2021-01-02'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'sat-2021-01-09'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.json$/, ''),
      },
    }
  })
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.json`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const data = JSON.parse(fileContents)

  // Combine the data with the id
  return {
    id,
    ...data,
  }
}
