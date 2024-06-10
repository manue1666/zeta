import Array "mo:base/Array";
import Text "mo:base/Text";

actor Rsocial {
  
  type post = {
    title : Text;
    content: Text;
  };

  type user = {
    username : Text;
    decripcion : Text;
  };

  var publications : [post] = [
    {
      title ="prueba";
      content = "este es un post de prueba";
    }
  ];

  public func addPost(title : Text, content : Text) : async Bool {
    let newPost = {
      title =title;
      content = content;
    };
    publications := Array.append<post>(publications, [newPost]);
    return true;

  };

  public func getAllpost() : async [post] {
    return publications;
  };

  public func updatePost(title : Text, content : Text) : async Bool {
    let postUpdate = Array.find<post>(publications, func(pu) {pu.title == title});

    switch (postUpdate) {
      case (null) {return false};
      case (?postUpdate){
        let updatedPost = {
          title = title;
          content = content;
        };
        publications := Array.map<post, post>(publications, func(p) {if(p.title == title) {updatedPost} else {p}});
        return true;
      };
    };
  };

  public func getPostByTitle (title : Text) : async ?post {
    return Array.find<post>(publications, func(pt) {pt.title == title});
  };

  public func deletePost(title : Text) : async Bool {
    let pu = Array.find<post>(publications, func(pu){pu.title == title});
    if (pu != null){
      publications := Array.filter<post>(publications, func(pu) {pu.title != title});
      return true;
    } else {
      return false;
    };
  };
};
