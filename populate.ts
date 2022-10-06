import chats from "./db/models/chats";


chats.findOneAndUpdate({uid:'633ec0181c9b99b464a388f4'},{$push:{chats:{uid:"633ec0da952cfc2711c86b0a",chats:[]}}})