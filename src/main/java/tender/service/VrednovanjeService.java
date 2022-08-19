package tender.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tender.domain.Vrednovanje;
import tender.repository.VrednovanjeRepository;

@Service
@Transactional
public class VrednovanjeService {

    private final Logger log = LoggerFactory.getLogger(VrednovanjeService.class);

    private final VrednovanjeRepository VrednovanjeRepository;

    public VrednovanjeService(VrednovanjeRepository VrednovanjeRepository) {
        this.VrednovanjeRepository = VrednovanjeRepository;
    }

    @Transactional(readOnly = true)
    public Page<Vrednovanje> findAll(Pageable pageable) {
        log.debug("Request to get all Vrednovanjes");
        return VrednovanjeRepository.findAll(pageable);
    }
}
