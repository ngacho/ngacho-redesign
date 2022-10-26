import { db, doc, collection, getDoc, setDoc, deleteDoc, query, onSnapshot } from '../admin/firebase.js'

export class BlogModel {

    constructor() {
        // empty blogs
        this.blogKeys = [];
        this.writtenToStorage = this.Bool(false);
        // will tell us if there are new changes.
        this.init();
    }

    init() {
        const q = query(collection(db, "blogs"));
        const blogSnapshots = onSnapshot(q, (querySnapshot) => {
            const blogKeys = [];
            querySnapshot.forEach((blog_data) => {
                let blog = blog_data.data();
                blog["blogId"] = blog_data.id;
                // store keys
                blogKeys.push(blog["blogId"]);
                // write to local storage.
                window.sessionStorage.setItem(blog["blogId"], JSON.stringify(blog));
            });

            this.blogKeys = blogKeys;
            this.writtenToStorage(true);

        });


    }

    async listenForBlogs() {

        const q = query(collection(db, "blogs"));
        const blogSnapshots = await onSnapshot(q, (querySnapshot) => {
            const blogs = [];
            querySnapshot.forEach((blog_data) => {
                let blog = blog_data.data();
                // store keys
                this.blogKeys.push(blog["title"]);
                // write to local storage.
                window.sessionStorage.setItem(blog["title"], JSON.stringify(blog));
            });

            this.blogList = blogs;
        });

        // unsubscribe elshere.

    }


    // pass me a new blog. I'll modify the id
    async addBlog(blog) {
        console.log(JSON.stringify(blog));

        // if it has a blog Id, then it's not a new blog then reject promise.
        return new Promise((resolve, reject) => {
            if (!blog["blodId"]) {
                // generating id
                var id = ''
                let letters = 'abcdefghijklmnopqrstuvwxyz';
                let blogTitle = blog["title"].split(" ").join("-");
                for (let i = 0; i < 4; i++) {
                    id += letters[Math.floor(Math.random() * letters.length)];
                }
                var docName = `${blogTitle}-${id}`;

                setDoc(doc(db, "blogs", docName), blog).then((ref) => {

                    // store keys
                    this.blogKeys.push(docName);
                    // write to local storage.
                    window.sessionStorage.setItem(docName, JSON.stringify(blog));

                    // return success to function that called it.
                    resolve('Blog Published Successfully')
                }).catch((err) => {
                    // return error
                    reject(err)
                })

            } else {
                reject('Not new blog');
            }

        });

    }

    // pass me an edited blog, it should have a blog id.
    async editBlog(editedBlog) {
        return new Promise((resolve, reject) => {
            const docName = editedBlog["blogId"];
            if (docName) {
                // pass the blog with the docName as id
                setDoc(doc(db, "blogs", docName), editedBlog).then((_) => {
                    resolve("Successfully edited blog")
                }).catch((err) => {
                    // return error
                    reject(err)
                })

            } else {
                // reject promises.
                reject("No valid blog id.")

            }
        });
    }

    async getBlogs() {
        return new Promise((resolve, reject) => {
            // get from local storage.
            this.writtenToStorage.addListener((writtenToStorageBool) => {
                // if something has been written to storage.
                if (writtenToStorageBool) {
                    var blogs = [];
                    for (const blogKey of this.blogKeys) {
                        var blog = JSON.parse(sessionStorage.getItem(blogKey));
                        // push blog to blog list
                        blogs.push(blog);
                    }
                    resolve(blogs);
                    // a key to indicate any new changes.
                } else {
                    console.error("Nothing written to storage.")
                    reject("Nothing was written to storage");
                }
            });

        });
    }

    // singular blog.
    async getBlog(blogId) {
        return new Promise((resolve, reject) => {

            // read from session storage.
            var blog = JSON.parse(sessionStorage.getItem(blogId));
            if (blog) {
                resolve(blog);
            } else {
                reject("Blog not found.");
            }
        });
    }

    async deleteBlogById(blogId) {
        return new Promise((resolve, reject) => {
            if (blogId) {
                const blogRef = async (id) => {
                    await deleteDoc(doc(db, "blogs", id));
                }
                blogRef(blogId).then((ref) => {
                    resolve(true)
                }).catch((err) => {
                    console.log(err);
                    reject(false);
                });
            } else {
                console.error("blog doesn't exist.")
                reject(false);
            }
        });
    }

    // filter blog by tags.
    async getBlogsByTags(tag) {
        return new Promise((resolve, reject) => {
            // get from local storage.
            this.writtenToStorage.addListener((writtenToStorageBool) => {
                // if something has been written to storage.
                if (writtenToStorageBool) {
                    var blogsByTag = [];

                    for (const blogKey of this.blogKeys) {
                        var blog = JSON.parse(sessionStorage.getItem(blogKey));
                        if (blog["tags"].include(tag)) {
                            blogsByTag.push(blog);
                        }

                    }

                    resolve(blogsByTag);
                    // a key to indicate any new changes.
                } else {
                    reject("Nothing was written to storage");
                }
            }).catch((err) => {
                console.error(err);
            });

        });
    }

    // listen booleans
    Bool(initialValue) {
        var bool = !!initialValue;
        var listeners = [];
        var returnVal = function (value) {
            if (arguments.length) {
                var oldValue = bool;
                bool = !!value;
                listeners.forEach(function (listener, i, list) {
                    listener.call(returnVal, { oldValue: oldValue, newValue: bool });
                });
            }
            return bool
        };
        returnVal.addListener = function (fn) {
            if (typeof fn == "function") {
                listeners.push(fn);
            }
            else {
                throw "Not a function!";
            }
        };
        return returnVal;
    }
}
