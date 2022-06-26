import { db, doc, collection, getDoc, setDoc, query, onSnapshot } from '../admin/firebase.js'

export class Model {

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
            console.log(this.blogKeys.length);
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
    addBlog(blog) {

        // if it has a blog Id, then it's not a new blog then reject promise.
        if (!blog["blodId"]) {
            // generating id
            var id = ''
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            let blogTitle = blog["title"].split(" ").join("-");
            for (let i = 0; i < 4; i++) {
                id += letters[Math.floor(Math.random() * letters.length)];
            }
            docName = `${blogTitle}-${id}`;

            // new 
            let date = new Date(); // for published at info

            var new_blog = {
                title: blog["title"],
                tags: blog["tags"].split(','),
                descript: blog["descript"],
                article: blog["article"],
                publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
                lastModified: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
            }

            setDoc(doc(db, "blogs", docName), new_blog).then((ref) => {
                // add to blogs list
                this.blogs.push(blog);

                // return success to function that called it.

            }).catch((err) => {
                // return error
            })

        } else {
            // return error.

        }

    }

    // pass me an edited blog, it should have a blog id.
    editBlog(editedBlog) {
        const docName = blog["blogId"];
        if (docName) {
            // pass the blog with the docName as id
            setDoc(doc(db, "blogs", docName), editedBlog).then((ref) => {
                // map to do list
                this.blogs = this.blogs.map((blog) => {
                    blog["blogId"] === docName ? {
                        blogId: docName,
                        title: editedBlog["title"],
                        tags: editedBlog["tags"],
                        descript: editedBlog["descript"],
                        article: editedBlog["article"],
                        publishedAt: editedBlog["publishedAt"],
                        lastModified: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
                    } : blog
                })

                // return success.

            }).catch((err) => {
                // return error
            })

        } else {
            // reject promises.

        }

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
                    console.log("Nothing written to storage.")
                    reject("Nothing was written to storage");
                }
            });

        });
    }




    // singular blog.
    getBlog(blogId) {
        var blog_data = async (id) => {
            await getDoc(doc(db, "blogs", id));
        }

        blog_data(blogId).then((blogSnapshot) => {
            if (blogSnapshot.exists()) {
                // return the blog
                console.log("Blog exists");
            } else {
                console.log("Blog doesn't exist");
                // location.replace("/blog");
            }
        }).catch((err) => {
            console.log(err);
        });

    }

    deleteBlog(blogId) {
        if (blogId) {
            const blogRef = async (id) => {
                await deleteDoc(doc(db, "blogs", id));
            }
            blogRef(blogId).then((ref) => {
                console.log("blog deleted")
            }).catch((err) => {
                console.log(err);
            });
        } else {
            console.log(err)
        }
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
            }).catch((err)=>{
                console.log(err);
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
