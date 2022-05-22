import { db, collection, doc, getDoc } from '../admin/firebase.js'

let path_extension = decodeURI(location.search);
var blogId = path_extension.slice(1);
console.log(blogId);

const getBlog = async (id) => {
    await getDoc(doc(db, "blogs", id))
        .then((blogSnapshot) => {
            if (blogSnapshot.exists()) {
                setupBlog(blogSnapshot.data());
            } else {
                console.log("Blog doesn't exist");
                // location.replace("/blog");
            }
        }).catch((err) => {
            console.log(err);
        });

};

getBlog(blogId);

const setupBlog = (data) => {
    var blog_heading_container = document.querySelector(".blog-heading-wrapper");
    var heading_element = document.createElement('h1');
    heading_element.className = "blog-heading";
    var heading = document.createTextNode(data["title"]);
    heading_element.appendChild(heading);
    blog_heading_container.appendChild(heading_element);


    var blog_content_container = document.querySelector(".blog-content");

    var time_element = document.createElement('time');
    var time = document.createTextNode(data["publishedAt"]);
    time_element.appendChild(time);
    blog_content_container.appendChild(time_element);

    var descript = data["descript"];
    if (descript) {
        var blockQuote_element = document.createElement('blockquote');
        blockQuote_element.className = "post-description";
        var blockQuote = document.createTextNode(descript);
        blockQuote_element.appendChild(blockQuote);
        blog_content_container.appendChild(blockQuote_element);
    }

    var article_element = document.createElement('article');
    article_element.className = "blog-post";
    var blog = data["article"].split("</br>");
    for (let blogel of blog) {
        var break_element = document.createElement('br');
        var second_break = document.createElement('br');


        // check for heading.
        if (blogel[0] == '#') {
            let hCount = 0;
            let i = 0;
            while (blogel[i] == '#') {
                hCount++;
                i++;
            }
            let tag = document.createElement(`h${hCount}`);
            let heading_element = document.createTextNode(blogel.replaceAll("#", ""));
            tag.appendChild(heading_element);
            article_element.appendChild(tag);
        } //checking for link format
        else {
            // split where we think the paragraph starts
            var paragraph_collection = blogel.split('![');
            // add element to the child document
            var pre_link_text = document.createTextNode(paragraph_collection[0]);
            article_element.appendChild(pre_link_text);
            // check if there was something
            if (paragraph_collection.length > 1) {
                // split into two, the elements we want and the rest of the paragraph.
                var paragraph_el_array = paragraph_collection[1].split(')]');
                var link_el_array = paragraph_el_array[0].split('|(');

                var link_text = link_el_array[0]
                var link_href = link_el_array[1];

                var link_tag = document.createElement('a');
                var link_text_element = document.createTextNode(link_text);
                link_tag.href = link_href;
                link_tag.appendChild(link_text_element);
                article_element.appendChild(link_tag);

                // post link tag
                var post_link_text = paragraph_el_array[1];
                var post_link_text_el = document.createTextNode(post_link_text);
                article_element.appendChild(post_link_text_el);
            } else {
                article_element.appendChild(break_element);
                article_element.appendChild(second_break);
            }
        }




        // else if (blogel[0] == "!" && blogel[1] == "[") {
        //     // ![hello world|(https://stackoverflow.com/questions/498461/how-to-save-user-entered-line-breaks-from-a-textarea-to-a-database)]
        //     let link_full = blogel.slice(2, -1);

        //     let link_array = link_full.split("|");
        //     let text = link_array[0]; // text
        //     let link_text = link_array[1].split(1, -1); // link itself.
        //     console.log(link_text);

        //     let link_tag = document.createElement('a');
        //     link_tag.href = link_text;
        //     let link_text_element = document.createTextNode(text);
        //     link_tag.appendChild(link_text_element);
        // }


    }
    blog_content_container.appendChild(article_element);
}