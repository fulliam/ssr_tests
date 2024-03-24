import '@/styles/market/index.scss';
import { useMarket } from '@/store/market';
import { useHead } from '@vueuse/head';

export default defineComponent({
  name: 'Markets',
  async serverPrefetch() {},
  async setup() {
    const marketStore = useMarket();
    onServerPrefetch(async () => {
      await marketStore.getList();
    });

    useHead({
      // title: 'This is my page title',
      meta: [
        { name: 'og:title', content: 'Моя страница' },
        { name: 'og:description', content: 'Моя страница' },
        { name: 'og:image', content: 'https://www.w3schools.com/images/w3schools_green.jpg' }
      ]
    });

    onMounted(() => {
      marketStore.getList();
    });

    return () => (
      <div>
        <h3>FruitList</h3>
        <table class="table">
          <thead>
            <tr>
              <th class="c-#67c23a">ID</th>
              <th class="c-#e6a23c">Name</th>
              <th class="c-#79bbff">Price</th>
            </tr>
          </thead>

          <tbody>
            {marketStore.fruitList.map((item) => {
              return (
                <tr key={item.id}>
                  <td class="c-#67c23a">{item.id}</td>
                  <td class="c-#e6a23c">{item.name}</td>
                  <td class="c-#79bbff">{'$' + item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
});
