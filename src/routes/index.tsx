import {
	$,
	component$,
	useSignal
} from '@builder.io/qwik';
import InfiniteList from '~/components/InfiniteList/InfiniteList';
import Item from '~/components/Item/Item';
import LoadingScheleton from '~/components/LoadingScheleton/LoadingScheleton';


export default component$(() => {
	const loadMore = useSignal(true);
	const itemsSig = useSignal([...new Array(5).keys()]);

	return (
		<div class='flex flex-col items-center'>
			<InfiniteList
				loadMore={loadMore.value}
				onLoadMore$={$(() => {
					itemsSig.value = [...itemsSig.value, ...new Array(5).keys()];
					loadMore.value = Math.random() > 0.1;
				})}
			>
				{itemsSig.value.map((_, key) => (
					<Item key={key} />
				))}
				<div q:slot='loading' >
					<LoadingScheleton />
				</div>
			</InfiniteList>
		</div>
	);
});
