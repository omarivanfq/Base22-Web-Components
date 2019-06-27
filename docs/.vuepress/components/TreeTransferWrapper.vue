<template>
  <div class="nova-transfer">
    <h2>Demo</h2>

    <nova-transfer> </nova-transfer>

    <input
      type="button"
      value="Cambiar show-search"
      onClick="document.querySelector('nova-transfer').showSearch= !document.querySelector('nova-transfer').showSearch"
    />

    <input
      type="button"
      value="Cambiar showSelectAll"
      onClick="document.querySelector('nova-transfer').showSelectAll= !document.querySelector('nova-transfer').showSelectAll"
    />

    <input
      type="button"
      value="Cambiar disabled"
      onClick="document.querySelector('nova-transfer').disabled= !document.querySelector('nova-transfer').disabled"
    />

    <script>
      var data = {
        items: [
          {
            key: "key1",
            title: "Title1",
            description: "Description1",
            disabled: false
          },
          {
            key: "key2",
            title: "Title2",
            description: "Description2",
            disabled: true
          },
          {
            key: "key3",
            title: "Title3",
            description: "Description3",
            disabled: false
          },
          {
            key: "key4",
            title: "Title4",
            description: "Description4",
            disabled: false
          },
          {
            key: "key5",
            title: "Title5",
            description: "Description5",
            disabled: false
          },
          {
            key: "key6",
            title: "Title6",
            description: "Description6",
            disabled: false
          },
          {
            key: "key7",
            title: "Title7",
            description: "Description7",
            disabled: true
          },
          {
            key: "key9",
            title: "Title9",
            description: "Description9",
            disabled: false
          },
          {
            key: "key10",
            title: "Title10",
            description: "Description10",
            disabled: false
          },
          {
            key: "key11",
            title: "Title11",
            description: "Description11",
            disabled: true
          },
          {
            key: "key12",
            title: "Title12",
            description: "Description12",
            disabled: false
          },
          {
            key: "key13",
            title: "Title13",
            description: "Description13",
            disabled: false
          },
          {
            key: "key14",
            title: "Title14",
            description: "Description14",
            disabled: false
          },
          {
            key: "key15",
            title: "Title15",
            description: "Description15",
            disabled: false
          },
          {
            key: "key16",
            title: "Title16",
            description: "Description16",
            disabled: false
          },
          {
            key: "key17",
            title: "Title17",
            description: "Description17",
            disabled: false
          }
        ],
        targetKeys: ["key6", "key11"]
      };
    </script>
    <script>
      console.log(document.querySelector("nova-transfer"));
      console.log(data);
      document.querySelector("nova-transfer").data = data;
    </script>
  </div>
</template>
