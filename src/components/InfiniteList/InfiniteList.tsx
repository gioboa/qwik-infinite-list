import {
	Slot,
	component$,
	useSignal,
	useVisibleTask$,
	type PropFunction,
} from '@builder.io/qwik';

type InfiniteListProps = {
	loadMore: boolean;
	onLoadMore$: PropFunction<() => void>;
};

export default component$<InfiniteListProps>(({ loadMore, onLoadMore$ }) => {
	const listSig = useSignal<Element>();

	useVisibleTask$(() => {
		if (listSig.value) {
			const intersectionObserver = new IntersectionObserver(
				([{ isIntersecting }]) => {
					if (isIntersecting) {
						onLoadMore$();
					}
				},
				{ rootMargin: '150%', threshold: 0 }
			);
			intersectionObserver.observe(listSig.value);
		}
	});

	return (
		<>
			<Slot />
			{loadMore && (
				<div ref={listSig}>
					<Slot name='loading' />
				</div>
			)}
		</>
	);
});
