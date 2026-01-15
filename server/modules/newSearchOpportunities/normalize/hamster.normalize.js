function normalizeHamster(ai) {
  const isTargetListing =
    ai.is_target_listing != null ? !!ai.is_target_listing : false;

  const custom = {
    is_target_listing: isTargetListing,
  };

  const key = "global";

  return { custom, key };
}

module.exports = { normalizeHamster };
